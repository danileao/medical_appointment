"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorMapper = void 0;
class DoctorMapper {
}
exports.DoctorMapper = DoctorMapper;
DoctorMapper.prismaToEntityDoctor = (data) => {
    return {
        crm: data.crm,
        email: data.email,
        specialityId: data.speciality_id,
        userId: data.user_id,
        id: data.id,
    };
};
DoctorMapper.prismaToEntityDoctorWithUser = (data) => {
    return {
        crm: data.crm,
        email: data.email,
        specialityId: data.speciality_id,
        userId: data.user_id,
        id: data.id,
        user: {
            name: data.user.name,
        },
    };
};
