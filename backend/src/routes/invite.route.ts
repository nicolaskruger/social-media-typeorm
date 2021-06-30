import { InviteController } from '@/controllers/invite.controller';
import { SendInviteDto } from '@/dtos/invite.dto';
import { IdQueryDto } from '@/dtos/query.dto';
import Route from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class InviteRoute implements Route {
  public path = '/invite';
  public router = Router();

  public inviteController = new InviteController();

  constructor() {
    this.initialRoutes();
  }

  private initialRoutes() {
    this.router.post(`${this.path}/send`, validationMiddleware(SendInviteDto, 'body'), authMiddleware, this.inviteController.sendInvite);
    this.router.get(`${this.path}/send`, authMiddleware, this.inviteController.invitesSend);
    this.router.get(`${this.path}/recive`, authMiddleware, this.inviteController.invitesRecive);
    this.router.post(`${this.path}/accept`, validationMiddleware(IdQueryDto, 'query'), authMiddleware, this.inviteController.acceptInvite);
    this.router.delete(`${this.path}/deny`, validationMiddleware(IdQueryDto, 'query'), authMiddleware, this.inviteController.denyInvite);
  }
}

export { InviteRoute };
