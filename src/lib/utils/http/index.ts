import HttpClient from "./client";

const http = new HttpClient(process.env.NEXT_PUBLIC_API_BASE_URL!);

export default http;
