import { S3 } from "aws-sdk";
import { getContentType } from "content-type-to-ext";
import config from "../../../config";
import uuid = require("uuid");

export interface IS3Upload {
  ETag: string;
  Location: string;
  key?: string;
  Key?: string;
  Bucket: string;
}

const s3 = new S3({
  region: config.s3.region,
  accessKeyId: config.s3.accessKeyId,
  secretAccessKey: config.s3.secretAccessKey,
});

const parseImage = (data: string) => {
  const reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
  const match = data.match(reg);
  const baseType = {
    jpg: "jpg",
    png: "png",
    gif: "gif",
    svg: "svg",
    "svg+xml": "svg",
  };
  if (!match) {
    throw new Error("image base64 data error");
  }
  const found = Object.entries(baseType).find(([key, value]) => key === match[1]);
  const extName = found ? found[1] : match[1];
  return {
    mimeType: getContentType(extName as any),
    buffer: match[2],
    extName: `.${extName}`,
  };
};

export const uploadImage = async (imageBuffer: string): Promise<string> => {
  try {
    const fileName = uuid.v1();
    const { mimeType, buffer, extName } = parseImage(imageBuffer);
    return new Promise((resolve, reject) => {
      s3.upload(
        {
          Key: `${fileName}${extName}`,
          Body: Buffer.from(buffer, "base64"),
          Bucket: config.s3.Bucket,
          ACL: "public-read",
          ContentType: mimeType,
        },
        (err: any, data: IS3Upload) => {
          if (err) {
            reject(err);
          }
          resolve(data.Location);
        },
      );
    });
  } catch (e) {
    return Promise.resolve(imageBuffer);
  }
};

export const deleteImage = async (fileName: string) =>
  new Promise((resolve, reject) => {
    s3.deleteObject(
      {
        Bucket: config.s3.Bucket,
        Key: fileName,
      },
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      },
    );
  });
