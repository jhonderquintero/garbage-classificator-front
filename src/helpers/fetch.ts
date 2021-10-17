export const serverFetch: any = async (
  url: string,
  method: "POST" | "GET" = "GET",
  body: any,
  headers: object = {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  }
) => {
  var config: any = {
    method,
    headers: { ...headers },
    body: JSON.stringify(body),
    mode: "cors",
  };

  const response = await fetch(url, config);
  return await response.json();
};
