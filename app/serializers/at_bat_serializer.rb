class AtBatSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  attributes :player, :result, :base_reached, :out_number, :out_code
  belongs_to :inning
  
end
