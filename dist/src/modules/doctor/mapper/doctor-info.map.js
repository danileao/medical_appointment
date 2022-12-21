"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorInfoMapper = void 0;
class DoctorInfoMapper {
}
exports.DoctorInfoMapper = DoctorInfoMapper;
DoctorInfoMapper.prismaToEntityDoctorInfo = (data) => {
    return {
        doctorId: data.doctor_id,
        id: data.id,
        duration: data.duration,
        price: Number(data.price),
    };
};
