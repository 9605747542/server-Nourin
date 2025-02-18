import { Router } from "express";
const userRoute=Router();
import userlogin from "../../controllers/userControllers/loginDetails";
import { verifyToken } from "../../middlewares/userMiddle";
// import { authenticateToken } from "../../middlewares/userMiddle";    
import { checkIfUserBlocked } from "../../middlewares/userIsBlock";
import { loginServices } from "../../service/userService/loginService";
import { loginRepo } from "../../repository/userRepository/loginRepo";
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

const userRepositoryInstance=new loginRepo();

const userServiceInstance=new loginServices(userRepositoryInstance);
const userLoginRouter=new userlogin(userServiceInstance);
// const userLoginRouter=new userlogin();
userRoute.post('/login',userLoginRouter.loginDetails.bind(userLoginRouter));
userRoute.post('/submit',userLoginRouter.postUserDetails.bind(userLoginRouter));
userRoute.post('/verifyOtp',userLoginRouter.verifyOTP.bind(userLoginRouter));
userRoute.post('/resendOtp',userLoginRouter.resendOtp.bind(userLoginRouter));
userRoute.post('/googleAuth',userLoginRouter.googleAuth.bind(userLoginRouter));
userRoute.post('/forgotEmail',userLoginRouter.forgotPassword.bind(userLoginRouter));
userRoute.post('/verifyForgotOtp',userLoginRouter.verifyForgotOtp.bind(userLoginRouter));
userRoute.post('/resetPassword',userLoginRouter.resetPassword.bind(userLoginRouter));
userRoute.get('/getAllCategoryDetails',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.getAllCategoryDetails.bind(userLoginRouter))
userRoute.get('/profile/:userId',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.setProfileDetails.bind(userLoginRouter));
userRoute.post('/changeUserProfile',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.changeUserProfileDetails.bind(userLoginRouter));
userRoute.post('/refresh-token',userLoginRouter.reGenerateAccessToken.bind(userLoginRouter));
userRoute.get('/user/events/:category',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.getCategoryTypeDetails.bind(userLoginRouter));
userRoute.post('/post/handleLike',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.postHandleLike.bind(userLoginRouter));
userRoute.get('/post/handleDetails/:postId',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.getPostDetails.bind(userLoginRouter));
userRoute.get('/post/getSelectEvent/:id',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.getSelectedEventDetails.bind(userLoginRouter));
userRoute.post('/post/create-checkout-session',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.makePaymentStripe.bind(userLoginRouter));
userRoute.get('/post/getSelectedEventData/:postId',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.getAnEventDetails.bind(userLoginRouter));
userRoute.get('/generateOtpForResetPassword/:userId',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.generateOtpForPassword.bind(userLoginRouter));
userRoute.post('/verifyOtpForPassword',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.verifyOtpForPassword.bind(userLoginRouter));
userRoute.post('/handleResetPassword',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.handleResetPassword.bind(userLoginRouter));
userRoute.get(`/getExistingReview/:eventId/:userId`,checkIfUserBlocked,verifyToken(['user']),userLoginRouter.getExistingReviews.bind(userLoginRouter));
userRoute.post('/review-rating',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.postReviewAndRating.bind(userLoginRouter));
userRoute.post(`/saveBillingDetails`,checkIfUserBlocked,verifyToken(['user']),userLoginRouter.saveBillingDetails.bind(userLoginRouter));
userRoute.get('/getEventHistory',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.getEventHistoryDetails.bind(userLoginRouter));
userRoute.get('/getManagerName/:userId',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.getBookedManagerDetails.bind(userLoginRouter));
userRoute.get('/getBookedEvent',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.getEventBookedDetails.bind(userLoginRouter));
userRoute.post('/create-chatSchema',checkIfUserBlocked,verifyToken(['user']),userLoginRouter.createChatSchema.bind(userLoginRouter));
// userRoute.post(`/uploadUserProfile/:userId`,checkIfUserBlocked,verifyToken(['user']),upload.single('images'),userLoginRouter.uploadUserProfilePicture.bind(userLoginRouter));
export default userRoute;