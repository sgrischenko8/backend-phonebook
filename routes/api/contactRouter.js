const { Router } = require("express");

const { contactController } = require("../../controllers");
const { contactMiddleware } = require("../../middlewares");
const { userMiddleware } = require("../../middlewares");

const router = Router();

router.use("/", userMiddleware.checkToken);
router
  .route("/")
  .get(contactMiddleware.checkAbsenceBody, contactController.listContacts)
  .post(contactMiddleware.throwError, contactController.addContact);
router.use("/:contactId", contactMiddleware.checkContactId);
router
  .route("/:contactId")
  .patch(
    contactMiddleware.checkAbsenceBodyInPatch,
    contactMiddleware.throwError,
    contactController.updateContact
  )
  .delete(contactMiddleware.checkAbsenceBody, contactController.removeContact);
router
  .route("/:contactId/avatars")
  .patch(
    contactMiddleware.checkAbsenceBodyInPatch,
    contactMiddleware.checkContactId,
    contactMiddleware.checkFile,
    contactMiddleware.uploadContactAvatar,
    contactMiddleware.resizeContactAvatar,
    contactController.updateAvatar
  );
module.exports = router;
