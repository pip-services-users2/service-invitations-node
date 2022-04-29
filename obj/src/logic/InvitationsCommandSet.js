"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const InvitationV1Schema_1 = require("../data/version1/InvitationV1Schema");
class InvitationsCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
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
    makeGetInvitationsCommand() {
        return new pip_services3_commons_nodex_2.Command("get_invitations", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getInvitations(correlationId, filter, paging);
        }));
    }
    makeGetInvitationByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_invitation_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('invitation_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let invitation_id = args.getAsString("invitation_id");
            return yield this._logic.getInvitationById(correlationId, invitation_id);
        }));
    }
    makeCreateInvitationCommand() {
        return new pip_services3_commons_nodex_2.Command("create_invitation", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('invitation', new InvitationV1Schema_1.InvitationV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let invitation = args.get("invitation");
            return yield this._logic.createInvitation(correlationId, invitation);
        }));
    }
    makeDeleteInvitationByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_invitation_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('invitation_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let invitationId = args.getAsNullableString("invitation_id");
            return yield this._logic.deleteInvitationById(correlationId, invitationId);
        }));
    }
    makeActivateInvitationsCommand() {
        return new pip_services3_commons_nodex_2.Command("activate_invitations", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('email', pip_services3_commons_nodex_6.TypeCode.String)
            .withRequiredProperty('user_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let email = args.getAsNullableString("email");
            let userId = args.getAsNullableString("user_id");
            return yield this._logic.activateInvitations(correlationId, email, userId);
        }));
    }
    makeApproveInvitationCommand() {
        return new pip_services3_commons_nodex_2.Command("approve_invitation", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('invitation_id', pip_services3_commons_nodex_6.TypeCode.String)
            .withOptionalProperty('role', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let invitationId = args.getAsNullableString("invitation_id");
            let role = args.getAsNullableString("role");
            return yield this._logic.approveInvitation(correlationId, invitationId, role);
        }));
    }
    makeDenyInvitationCommand() {
        return new pip_services3_commons_nodex_2.Command("deny_invitation", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('invitation_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let invitationId = args.getAsNullableString("invitation_id");
            return yield this._logic.denyInvitation(correlationId, invitationId);
        }));
    }
    makeResendInvitationCommand() {
        return new pip_services3_commons_nodex_2.Command("resend_invitation", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('invitation_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let invitationId = args.getAsNullableString("invitation_id");
            return yield this._logic.resendInvitation(correlationId, invitationId);
        }));
    }
    makeNotifyInvitationCommand() {
        return new pip_services3_commons_nodex_2.Command("notify_invitation", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('invitation', new InvitationV1Schema_1.InvitationV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let invitation = args.get("invitation");
            return yield this._logic.notifyInvitation(correlationId, invitation);
        }));
    }
}
exports.InvitationsCommandSet = InvitationsCommandSet;
//# sourceMappingURL=InvitationsCommandSet.js.map