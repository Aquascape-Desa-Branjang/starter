const mongoose = require('mongoose');

const Schema = mongoose.Schema

const VFDSchema = new Schema({
    running_frequency: {
        type: Number,
    },
    set_frequency: {
        type: Number,
    },
    bus_voltage: {
        type: Number,
    },
    output_voltage: {
        type: Number,
    },
    output_current: {
        type: Number,
    },
    output_power: {
        type: Number,
    },
    output_torque: {
        type: Number,
    },
    x_state: {
        type: Number,
    },
    do_state: {
        type: Number,
    },
    ai1_voltage_before_correction: {
        type: Number,
    },
    ai2_voltage_before_correction: { //current
        type: Number,
    },
    ai3_voltage_before_correction: {
        type: Number,
    },
    linear_speed: {
        type: Number,
    },
    accumulative_poweron_time: {
        type: Number,
    },
    accumulative_running_time: {
        type: Number,
    },
    pulse_input_frequency: {
        type: Number,
    },
    communication_setting_value: {
        type: Number,
    },
    encoder_feedback_speed: {
        type: Number,
    },
    main_frequency_x: {
        type: Number,
    },
    aux_frequency_y: {
        type: Number,
    },
    synchronous_motor_rotor_pos: {
        type: Number,
    },
    motor_temperature: {
        type: Number,
    },
    target_torque: {
        type: Number,
    },
    resolver_position: {
        type: Number,
    },
    power_factor_angle: {
        type: Number,
    },
    abz_position: {
        type: Number,
    },
    target_voltage_upon_vf_separation: {
        type: Number,
    },
    output_voltage_upon_vf_separation: {
        type: Number,
    },
    x_state_visual_display: {
        type: Number,
    },
    do_state_visual_display: {
        type: Number,
    },
    x_function_state_visual_display_1: {
        type: Number,
    },
    x_function_state_visual_display_2: {
        type: Number,
    },
    fault_information: {
        type: Number,
    },
    phase_z_counting: {
        type: Number,
    },
    current_set_frequency: {
        type: Number,
    },
    current_running_frequency: {
        type: Number,
    },
    ac_drive_running_state: {
        type: Number,
    },
    current_fault_code: {
        type: Number,
    },
    sent_value_of_point_communication: {
        type: Number,
    },
    received_value_of_point_communication: {
        type: Number,
    },
    torque_upper_limit: {
        type: Number,
    }
}, {timestamps: true, versionKey: false})

module.exports = mongoose.model('VFD', VFDSchema)