import {Command} from "https://deno.land/x/cliffy/command/mod.ts";

export * from "./exportCmd.mjs";
export * from "./importCmd.mjs";
export * from "./removeAllCmd.mjs";
export * from "./removeDuplicateResource.mjs"
export * from "./scriptCmd.mjs";
import {getCopyCommand} from "./copyCmd.mjs";
import {getCreateCommand} from "./createCmd.mjs";
import {getListCommand} from "./listCmd.mjs";
import {getRemoveCommands} from "./removeCmd.mjs";
import {getAddUserToGroupCommands, getRemoveUserFromGroupCommands} from "./cmdUserGroup.mjs";
import {getAddResourceToSericeAccountCommands} from "./cmdAddResourceToServiceAccount.mjs";
import {getRemoveBulkCommands} from "./removeBulkCmd.mjs";
import {deviceUntrustCommands, deviceTrustCommands} from "./deviceTrustCmd.mjs";
import {
    getAddGroupToResourceCommands,
    getAddResourceToGroupCommands,
    getRemoveGroupFromResourceCommands, getRemoveResourceFromGroupCommands
} from "./cmdGroupResource.mjs"
import {getServiceAccountKeyCreateCommands} from "./serviceAccountKey.mjs";
import { AddGroupToPolicyCommands, setGroupPolicyCommands} from "./cmdPolicyGroup.mjs"
import {
    getUserGroupCommands,
    getGroupFromResourceCommands,
    getResourceFromGroupCommands,
    getAllUserEmailCommands,
    getAllGroupResourceCommands
} from "./getCmd.mjs";
import {getGenerateConnectorToken} from "./cmdConnectorToken.mjs";

export function getTopLevelCommand(name) {

    let cmd = new Command()
        .arguments('')
        .description(`Twingate ${name}s`.replace("ys", "ies"))
        .command("list", getListCommand(name))
    ;

    let createCmd = getCreateCommand(name);
    if ( createCmd !== null ) cmd = cmd.command("create", createCmd);

    let removeCmd = getRemoveCommands(name)
    if ( removeCmd !== null ) cmd = cmd.command("remove", removeCmd);

    let removeBulkCmd = getRemoveBulkCommands(name)
    if ( removeBulkCmd !== null ) cmd = cmd.command("remove_bulk", removeBulkCmd)

    let addUserToGroupCmd = getAddUserToGroupCommands(name)
    if ( addUserToGroupCmd !== null ) cmd = cmd.command("add_user", addUserToGroupCmd)

    let removeUserFromGroupCmd = getRemoveUserFromGroupCommands(name)
    if ( removeUserFromGroupCmd !== null ) cmd = cmd.command("remove_user", removeUserFromGroupCmd)

    let addGroupToResource = getAddGroupToResourceCommands(name)
    if ( addGroupToResource !== null ) cmd = cmd.command("add_group", addGroupToResource)

    let removeGroupFromResource = getRemoveGroupFromResourceCommands(name)
    if ( removeGroupFromResource !== null ) cmd = cmd.command("remove_group", removeGroupFromResource)

    let removeResourceFromGroup = getRemoveResourceFromGroupCommands(name)
    if ( removeResourceFromGroup !== null ) cmd = cmd.command("remove_resource", removeResourceFromGroup)

    let addResourceToServiceAccount = getAddResourceToSericeAccountCommands(name)
    if ( addResourceToServiceAccount !== null ) cmd = cmd.command("add_resource", addResourceToServiceAccount)

    let generateConnectorTokens = getGenerateConnectorToken(name)
    if ( generateConnectorTokens !== null ) cmd = cmd.command("generate_token", generateConnectorTokens)

    let getGroupFromResource = getGroupFromResourceCommands(name)
    if ( getGroupFromResource !== null ) cmd = cmd.command("get_group", getGroupFromResource)

    let getResourceFromGroup = getResourceFromGroupCommands(name)
    if ( getResourceFromGroup !== null ) cmd = cmd.command("get_resource", getResourceFromGroup)

    let getAllUserEmail = getAllUserEmailCommands(name)
    if ( getAllUserEmail !== null ) cmd = cmd.command("get_email", getAllUserEmail)

    let getUserGroup = getUserGroupCommands(name)
    if ( getUserGroup !== null ) cmd = cmd.command("get_group", getUserGroup)

    let addResourceToGroup = getAddResourceToGroupCommands(name)
    if ( addResourceToGroup !== null ) cmd = cmd.command("add_resource", addResourceToGroup)

    let serviceAccountKeyCreate = getServiceAccountKeyCreateCommands(name)
    if ( serviceAccountKeyCreate !== null ) cmd = cmd.command("key_create", serviceAccountKeyCreate)

    let getAllGroupResource = getAllGroupResourceCommands(name)
    if ( getAllGroupResource !== null ) cmd = cmd.command("get_all_resource", getAllGroupResource)

    let getSetGroupPolicy = setGroupPolicyCommands(name)
    if ( getSetGroupPolicy !== null ) cmd = cmd.command("set_policy", getSetGroupPolicy)

    let AddGroupToPolicy = AddGroupToPolicyCommands(name)
    if ( AddGroupToPolicy !== null ) cmd = cmd.command("add_group", AddGroupToPolicy)

    let deviceTrust = deviceTrustCommands(name)
    if ( deviceTrust !== null ) cmd = cmd.command("trust", deviceTrust)

    let deviceUntrust = deviceUntrustCommands(name)
    if ( deviceUntrust !== null ) cmd = cmd.command("untrust", deviceUntrust)



    switch (name) {
        case "group":
            cmd = cmd.command("copy", getCopyCommand(name))
            break;
        case "connector":

            break;
        default:
            // NoOp
            break;
    }
    return cmd;
}
