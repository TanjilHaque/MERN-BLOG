exports.validateBody = (req) => {
  if (req) {
    for (let field in req.body) {
      console.log(field);
      if (req.body[field] === "") {
        return { empty: true, fieldName: field };
      }
    }
  } else {
    return { empty: false };
  }
};
