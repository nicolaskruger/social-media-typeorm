import { SendInviteDto } from '@/dtos/invite.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { InviteService } from '@/services/invite.service';
import { Response, NextFunction } from 'express';

export class InviteController {
  private inviteService = new InviteService();

  public sendInvite = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const body: SendInviteDto = req.body;

      const user = req.user;

      await this.inviteService.sendInvite(user, body);

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  };

  public invitesSend = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const invites = await this.inviteService.invitesSend(user);

      res.status(200).send(invites);
    } catch (error) {
      next(error);
    }
  };

  public invitesRecive = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const invites = await this.inviteService.invitesRecive(user);

      res.status(200).send(invites);
    } catch (error) {
      next(error);
    }
  };

  public denyInvite = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const sendId = Number(req.query.id);

      await this.inviteService.denyInvite(user, sendId);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  public acceptInvite = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const sendId = Number(req.query.id);
      await this.inviteService.acceptInvite(user, sendId);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}
