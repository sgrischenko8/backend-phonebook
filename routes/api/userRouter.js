const { Router } = require("express");

const { userController } = require("../../controllers");
const { userMiddleware } = require("../../middlewares");

const router = Router();

router
  .route("/register")
  .post(
    userMiddleware.checkUserData,
    userMiddleware.checkIsEmailAlreadyUsed,
    userController.register
  );
router
  .route("/register/:verificationToken")
  .patch(userMiddleware.checkVerificationToken, userController.verify);

router
  .route("/login")
  .post(
    userMiddleware.checkVerification,
    userMiddleware.checkUserData,
    userMiddleware.IsEmailAndPasswordFit,
    userController.login
  );
router
  .route("/current")
  .get(userMiddleware.checkToken, userController.getCurrentUser);
router
  .route("/ping")
  .get(userController.getPing);
router.route("/logout").post(userMiddleware.checkToken, userController.logout);

module.exports = router;
