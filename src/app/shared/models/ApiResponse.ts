export type ApiReponse<Response> = {
  data: Response;
  message: string;
  status: boolean;
};
