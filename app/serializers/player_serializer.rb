class PlayerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :number, :position
end
