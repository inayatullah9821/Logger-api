import { Router } from 'express';
import { GetUserData, updateUserData } from '../controller/UserController';

const UserRoutes = Router();

/**
 * @swagger
 * /api/v1/user/:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users.
 *     responses:
 *       200:
 *         description: Success response.
 *       400:
 *         description: This error is sent when invalid details provided.
 *       500:
 *         description: Internal server error.
 */
UserRoutes.get('/', GetUserData);

/**
 * @swagger
 * /api/v1/user/update:
 *   patch:
 *     summary: update a user.
 *     description: update a users. Can be used to update a user when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: Success response.
 *       400:
 *         description: This error is sent when invalid details provided.
 *       500:
 *         description: Internal server error.
 */
UserRoutes.patch('/update', updateUserData);

export default UserRoutes;
