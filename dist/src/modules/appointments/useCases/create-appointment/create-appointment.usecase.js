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
exports.CreateAppointmentUseCase = void 0;
const custom_error_1 = require("../../../../errors/custom.error");
const date_1 = require("../../../../utils/date");
const appointment_entity_1 = require("../../entities/appointment.entity");
class CreateAppointmentUseCase {
    constructor(patientRepository, doctorRepository, doctorScheduleRepository, appointmentRepository, mailProvider) {
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.doctorScheduleRepository = doctorScheduleRepository;
        this.appointmentRepository = appointmentRepository;
        this.mailProvider = mailProvider;
    }
    execute(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const patientExists = yield this.patientRepository.findByUserId(userId);
            if (!patientExists) {
                throw new custom_error_1.CustomError('Patient does not exists!');
            }
            const doctorExists = yield this.doctorRepository.findById(data.doctorId);
            if (!doctorExists) {
                throw new custom_error_1.CustomError('Doctor does not exists!');
            }
            const dayOfWeek = (0, date_1.getDayOfWeek)((0, date_1.dateToString)(data.date));
            const doctorSchedule = yield this.doctorScheduleRepository.findByDoctorIdAndDayOfWeek(data.doctorId, dayOfWeek);
            if (!doctorSchedule) {
                throw new custom_error_1.CustomError('Doctor does not attend that day!');
            }
            const dateFormat = (0, date_1.formatDateUTC)(data.date, 'YYYY-MM-DD HH:mm');
            // Validar se horário está vazio
            const existAppointmentDoctor = yield this.appointmentRepository.findAppointmentByDoctorAndDatetime(doctorExists.id, dateFormat);
            if (existAppointmentDoctor) {
                throw new custom_error_1.CustomError('There is already an appointment for this time!');
            }
            // validar se o paciente não tem atendimento
            const existsAppointmentPatient = yield this.appointmentRepository.findAppointmentByPatientAndDatetime(doctorExists.id, dateFormat);
            if (existsAppointmentPatient) {
                throw new custom_error_1.CustomError('There is already an appointment for this patient!');
            }
            const appointment = appointment_entity_1.Appointment.create({
                date: (0, date_1.toDate)(data.date),
                doctorId: doctorExists.id,
                patientId: patientExists.id,
            });
            // Salvar o agendamento
            yield this.appointmentRepository.save(appointment);
            yield this.mailProvider.sendMail({
                to: patientExists.email,
                from: 'Agendamento de Consulta <noreplay@agendamedico.com.br>',
                html: `
          Olá ${patientExists.user.name}! <br/>
          Gostaria de confirmar o <b>agendamento de consulta</b> para o dia ${(0, date_1.formatDate)(data.date, 'DD/MM/YYYY')}  as ${(0, date_1.formatDate)(data.date, 'HH:mm')}
          com o doutor <b>${doctorExists.user.name}</b>
      `,
                subject: 'Agendamento de consulta',
            });
        });
    }
}
exports.CreateAppointmentUseCase = CreateAppointmentUseCase;
