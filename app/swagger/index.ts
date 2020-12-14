export const swaggerInterceptResponse = (data: any) => {
  if (data && data.obj && data.obj.token) {
    (this as any).localStorage.setItem("token", data.obj.token);
  }
  return data;
};

export const swaggerInterceptRequest = (data: any) => {
  if ((this as any).localStorage.token) {
    return {
      ...data,
      headers: {
        ...data.headers,
        authorization: `Bearer ${(this as any).localStorage.token}`,
      },
    };
  }
  return data;
};
