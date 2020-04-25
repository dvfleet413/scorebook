class AtBatSerializer
  include FastJsonapi::ObjectSerializer
  attributes :player, :result, :base_reached, :out_number
  belongs_to :inning
end
