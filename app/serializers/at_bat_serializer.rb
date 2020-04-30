class AtBatSerializer
  include FastJsonapi::ObjectSerializer
  attributes :player, :result, :base_reached, :out_number, :out_code
  belongs_to :inning
end
