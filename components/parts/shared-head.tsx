import React from "react";

const SharedHead = ({ title }: { title: string }) => {
  return (
    <html lang={"en"}>
      <meta charSet={"UTF-8"} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      <title>{title}</title>
    </html>
  );
};
export default SharedHead;
