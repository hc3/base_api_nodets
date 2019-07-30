import {Service} from "typedi";
import {hash, genSalt, compare} from "bcryptjs";

@Service()
export class PasswordEncoder {

    saltRounds = 10;

    async encode(raw: string) {
        const salt = await genSalt(this.saltRounds);
        return hash(raw, salt);
    }

    async verify(raw: string, hash: string) {
        return compare(raw, hash);
    }
}
