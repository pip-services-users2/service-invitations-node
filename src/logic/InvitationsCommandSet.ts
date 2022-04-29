import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';

import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { InvitationV1Schema } from '../data/version1/InvitationV1Schema';
import { IInvitationsController } from './IInvitationsController';

export class InvitationsCommandSet extends CommandSet {
    private _logic: IInvitationsController;

    constructor(logic: IInvitationsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetInvitationsCommand());
		this.addCommand(this.makeGetInvitationByIdCommand());
		this.addCommand(this.makeCreateInvitationCommand());
		this.addCommand(this.makeDeleteInvitationByIdCommand());
		this.addCommand(this.makeActivateInvitationsCommand());
		this.addCommand(this.makeApproveInvitationCommand());
		this.addCommand(this.makeDenyInvitationCommand());
		this.addCommand(this.makeResendInvitationCommand());
		this.addCommand(this.makeNotifyInvitationCommand());
    }

	private makeGetInvitationsCommand(): ICommand {
		return new Command(
			"get_invitations",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                return await this._logic.getInvitations(correlationId, filter, paging);
            }
		);
	}

	private makeGetInvitationByIdCommand(): ICommand {
		return new Command(
			"get_invitation_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('invitation_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let invitation_id = args.getAsString("invitation_id");
				return await this._logic.getInvitationById(correlationId, invitation_id);
            }
		);
	}

	private makeCreateInvitationCommand(): ICommand {
		return new Command(
			"create_invitation",
			new ObjectSchema(true)
				.withRequiredProperty('invitation', new InvitationV1Schema()),
			async (correlationId: string, args: Parameters) => {
                let invitation = args.get("invitation");
				return await this._logic.createInvitation(correlationId, invitation);
            }
		);
	}

	private makeDeleteInvitationByIdCommand(): ICommand {
		return new Command(
			"delete_invitation_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('invitation_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let invitationId = args.getAsNullableString("invitation_id");
				return await this._logic.deleteInvitationById(correlationId, invitationId);
			}
		);
	}

	private makeActivateInvitationsCommand(): ICommand {
		return new Command(
			"activate_invitations",
			new ObjectSchema(true)
				.withRequiredProperty('email', TypeCode.String)
				.withRequiredProperty('user_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let email = args.getAsNullableString("email");
                let userId = args.getAsNullableString("user_id");
				return await this._logic.activateInvitations(correlationId, email, userId);
			}
		);
	}

	private makeApproveInvitationCommand(): ICommand {
		return new Command(
			"approve_invitation",
			new ObjectSchema(true)
				.withRequiredProperty('invitation_id', TypeCode.String)
				.withOptionalProperty('role', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let invitationId = args.getAsNullableString("invitation_id");
                let role = args.getAsNullableString("role");
				return await this._logic.approveInvitation(correlationId, invitationId, role);
			}
		);
	}

	private makeDenyInvitationCommand(): ICommand {
		return new Command(
			"deny_invitation",
			new ObjectSchema(true)
				.withRequiredProperty('invitation_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let invitationId = args.getAsNullableString("invitation_id");
				return await this._logic.denyInvitation(correlationId, invitationId);
			}
		);
	}
	
	private makeResendInvitationCommand(): ICommand {
		return new Command(
			"resend_invitation",
			new ObjectSchema(true)
				.withRequiredProperty('invitation_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let invitationId = args.getAsNullableString("invitation_id");
				return await this._logic.resendInvitation(correlationId, invitationId);
			}
		);
	}

	private makeNotifyInvitationCommand(): ICommand {
		return new Command(
			"notify_invitation",
			new ObjectSchema(true)
				.withRequiredProperty('invitation', new InvitationV1Schema()),
			async (correlationId: string, args: Parameters) => {
                let invitation = args.get("invitation");
                return await this._logic.notifyInvitation(correlationId, invitation);
			}
		);
	}
	
}