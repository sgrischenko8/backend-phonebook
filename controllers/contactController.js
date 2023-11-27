const Contact = require("../models/contactModel");

exports.listContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { favorite, page, limit } = req.query;

  try {
    let contacts = [];
    if (favorite) {
      contacts = await Contact.find({ owner: _id, favorite });
    } else {
      contacts = await Contact.find({ owner: _id });
    }
    if (page || limit) {
      const paginationPage = page ? +page : 1;
      const pagination = limit ? +limit : 5;
      const docToSkip = (paginationPage - 1) * pagination;

      contacts = await Contact.find({ owner: _id })
        .skip(docToSkip)
        .limit(pagination);
    }

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

exports.addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  req.body.owner = owner;
  try {
    const newContact = await Contact.create(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

exports.removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    await Contact.deleteOne({ _id: contactId });

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    next(error);
  }
};

exports.updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const currentContact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      req.body
    );
    const updatedContact = Object.assign(currentContact, req.body);
    res.status(201).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

exports.updateAvatar = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(req.file);
  let avatar = "";
  if (req.file) {
    avatar = req.file.path.replace("tmp", "avatars");
  }
  try {
    await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
      avatarURL: avatar,
    });

    res.status(200).json({ avatarURL: avatar });
  } catch (error) {
    next(error);
  }
};
