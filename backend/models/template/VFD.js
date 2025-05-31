const mongoose = require('mongoose');

const Schema = mongoose.Schema

const VFDSchema = new Schema({
    running_frequency: {
        type: Number,
        required: true,
    },
    set_frequency: {
        type: Number,
        required: true,
    },
    bus_voltage: {
        type: Number,
        required: true,
    },
    output_voltage: {
        type: Number,
        required: true,
    },
    output_current: {
        type: Number,
        required: true,
    },
    output_power: {
        type: Number,
        required: true,
    },
    output_torque: {
        type: Number,
        required: true,
    },
    x_state: {
        type: Number,
        required: true,
    },
    do_state: {
        type: Number,
        required: true,
    },
    ai1_voltage_before_correction: {
        type: Number,
        required: true,
    },
    ai2_voltage_before_correction: { //current
        type: Number,
        required: true,
    },
    ai3_voltage_before_correction: {
        type: Number,
        required: true,
    },
    linear_speed: {
        type: Number,
        required: true,
    },
    accumulative_poweron_time: {
        type: Number,
        required: true,
    },
    accumulative_running_time: {
        type: Number,
        required: true,
    },
    pulse_input_frequency: {
        type: Number,
        required: true,
    },
    communication_setting_value: {
        type: Number,
        required: true,
    },
    encoder_feedback_speed: {
        type: Number,
        required: true,
    },
    main_frequency_x: {
        type: Number,
        required: true,
    },
    aux_frequency_y: {
        type: Number,
        required: true,
    },
    synchronous_motor_rotor_pos: {
        type: Number,
        required: true,
    },
    motor_temperature: {
        type: Number,
        required: true,
    },
    target_torque: {
        type: Number,
        required: true,
    },
    resolver_position: {
        type: Number,
        required: true,
    },
    power_factor_angle: {
        type: Number,
        required: true,
    },
    abz_position: {
        type: Number,
        required: true,
    },
    target_voltage_upon_vf_separation: {
        type: Number,
        required: true,
    },
    output_voltage_upon_vf_separation: {
        type: Number,
        required: true,
    },
    x_state_visual_display: {
        type: Number,
        required: true,
    },
    do_state_visual_display: {
        type: Number,
        required: true,
    },
    x_function_state_visual_display_1: {
        type: Number,
        required: true,
    },
    x_function_state_visual_display_2: {
        type: Number,
        required: true,
    },
    fault_information: {
        type: Number,
        required: true,
    },
    phase_z_counting: {
        type: Number,
        required: true,
    },
    current_set_frequency: {
        type: Number,
        required: true,
    },
    current_running_frequency: {
        type: Number,
        required: true,
    },
    ac_drive_running_state: {
        type: Number,
        required: true,
    },
    current_fault_code: {
        type: Number,
        required: true,
    },
    sent_value_of_point_communication: {
        type: Number,
        required: true,
    },
    received_value_of_point_communication: {
        type: Number,
        required: true,
    },
    torque_upper_limit: {
        type: Number,
        required: true,
    },
    deviceId: {
        type: String,
        required: true,
    }
}, {timestamps: true, versionKey: false})

module.exports = mongoose.model('VFD', VFDSchema)