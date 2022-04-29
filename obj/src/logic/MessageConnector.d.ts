import { ILogger } from 'pip-services3-components-nodex';
import { MessageV1 } from 'client-msgdistribution-node';
import { MessageResolverV1 } from 'client-msgdistribution-node';
import { IMessageDistributionClientV1 } from 'client-msgdistribution-node';
import { InvitationV1 } from '../data/version1/InvitationV1';
export declare class MessageConnector {
    private _logger;
    private _messageResolver;
    private _messageDistributionClient;
    constructor(_logger: ILogger, _messageResolver: MessageResolverV1, _messageDistributionClient: IMessageDistributionClientV1);
    sendInvitation(correlationId: string, message: MessageV1, invitation: InvitationV1): Promise<void>;
    sendAccessRequest(correlationId: string, message: MessageV1, invitation: InvitationV1, organizationAdminIds: string[]): Promise<void>;
}
