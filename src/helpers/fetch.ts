export const serverFetch: any = async (
  url: string,
  method: "POST" | "GET" = "GET",
  body: any,
  headers: object = {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
  parseJSON: boolean = true,
) => {
  var config: any = {
    method,
    headers: { ...headers },
    body: JSON.stringify(body),
    mode: "cors",
  };

  const response = await fetch(url, config);
  if (parseJSON) {
    return await response.json();
  }

  return response;
};
