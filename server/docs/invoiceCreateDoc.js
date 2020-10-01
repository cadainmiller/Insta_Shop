const create = (title, subject) => {
  var documentDefinition = {
    info: {
      title: title,
      author: "john doe",
      subject: subject,
      keywords: "keywords for document",
    },
    content: [`Hello `, "Nice to meet you!"],
  };

  return documentDefinition;
};

exports.create = create;
