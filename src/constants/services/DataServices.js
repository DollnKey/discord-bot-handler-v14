module.exports = class DataServices {
    constructor(client) {
        this.client = client
    };

    async getModel(type=null, valueId=null) {
        if(!type && !valueId) return undefined;
        if(type == 'guild') {
            return await this.registerGuildDatabase(valueId);
        } else if(type == 'user') {
            return await this.registerUserDatabase(valueId);
        };
    };

    async registerGuildDatabase(valueId=null) {
        if(!valueId) return undefined;

        const DBGuild = await this.client.database.get('Guild')?.findOne({ 'id': valueId });
        if(DBGuild) return await DBGuild;

        const DataGuild = await this.client.database.get('Guild')({
            'id': valueId
        }); DataGuild.save(); return await DataGuild;
    }

    async registerUserDatabase(valueId=null) {
        if(!valueId) return undefined;

        const DBUser = await this.client.database.get('User')?.findOne({ 'id': valueId });
        if(DBUser) return await DBUser;

        const DataUser = await this.client.database.get('User')({
            'id': valueId
        }); DataUser.save(); return await DataUser;
    };
}