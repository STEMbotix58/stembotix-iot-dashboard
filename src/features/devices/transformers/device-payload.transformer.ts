export const devicePayloadTransformer = (payload: any) => {
  return {
    id: payload.device_id,
    name: payload.device_name,
    status: payload.device_status,
    value: payload.current_value,
  };
};
