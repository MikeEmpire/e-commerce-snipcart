const importScript = (resourceUrl) => {
  const script = document.createElement("script");
  script.src = resourceUrl;
  script.async = true;
  return document.body.appendChild(script);
};

export default importScript;
