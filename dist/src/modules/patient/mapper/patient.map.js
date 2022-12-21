"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientMapper = void 0;
class PatientMapper {
}
exports.PatientMapper = PatientMapper;
PatientMapper.entityToPrisma = (patient) => {
    return {
        document: patient.document,
        email: patient.email,
        id: patient.id,
        user_id: patient.userId,
    };
};
PatientMapper.prismaToEntity = (patient) => {
    return {
        document: patient.document,
        email: patient.email,
        id: patient.id,
        userId: patient.user_id,
    };
};
PatientMapper.prismaToEntityIncludesUser = (patient) => {
    return {
        document: patient.document,
        email: patient.email,
        id: patient.id,
        userId: patient.user_id,
        user: {
            name: patient.user.name,
        },
    };
};
