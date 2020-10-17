import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/auth/types/auth.types";


export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});