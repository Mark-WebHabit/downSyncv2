const matching = [
  [
    {
      name: "Car",
      description: "A vehicle with four wheels for road travel.",
      image: require("../assets/images/matching/hard/Car.png"),
    },
    {
      name: "Canoe",
      description: "A lightweight boat paddled by hand.",
      image: require("../assets/images/matching/hard/Canoe.png"),
    },
    {
      name: "Airplane",
      description: "A vehicle that flies in the sky.",
      image: require("../assets/images/matching/hard/Airplane.png"),
    },
    {
      name: "Boat",
      description: "A vehicle that moves on water.",
      image: require("../assets/images/matching/hard/Boat.png"),
    },
  ],
  [
    {
      name: "Bicycle",
      description: "A two-wheeled vehicle powered by pedals.",
      image: require("../assets/images/matching/hard/Bicycle.png"),
    },
    {
      name: "Bus",
      description: "A large vehicle that carries many passengers.",
      image: require("../assets/images/matching/hard/Bus.png"),
    },
    {
      name: "Dog Sled",
      description: "A sled pulled by dogs on snow.",
      image: require("../assets/images/matching/hard/Dog_Sled.png"),
    },
    {
      name: "Glider",
      description: "A light aircraft without an engine.",
      image: require("../assets/images/matching/hard/Glider.png"),
    },
  ],
  [
    {
      name: "Hydroplane",
      description: "A fast boat that skims on water.",
      image: require("../assets/images/matching/hard/Hydroplane.png"),
    },
    {
      name: "Motorcycle",
      description: "A two-wheeled vehicle powered by an engine.",
      image: require("../assets/images/matching/hard/Motorcycle.png"),
    },
    {
      name: "Rickshaw",
      description: "A small cart pulled by a person or bike.",
      image: require("../assets/images/matching/hard/Rickshaw.png"),
    },
    {
      name: "Roller Skates",
      description: "Shoes with wheels for skating.",
      image: require("../assets/images/matching/hard/Roller_Skates.png"),
    },
  ],
  [
    {
      name: "Truck",
      description: "A large vehicle used to transport goods.",
      image: require("../assets/images/matching/hard/Truck.png"),
    },
    {
      name: "Helicopter",
      description: "A flying vehicle with rotating blades.",
      image: require("../assets/images/matching/hard/Helicopter.png"),
    },
    {
      name: "Subway",
      description: "A train that runs underground.",
      image: require("../assets/images/matching/hard/Subway.png"),
    },
    {
      name: "Scooter",
      description: "A small two-wheeled vehicle.",
      image: require("../assets/images/matching/hard/Scooter.png"),
    },
  ],
  [
    {
      name: "Tram",
      description: "A city train on tracks.",
      image: require("../assets/images/matching/hard/Tram.png"),
    },
    {
      name: "Ferry",
      description: "A boat that carries people and cars.",
      image: require("../assets/images/matching/hard/Ferry.png"),
    },
    {
      name: "Jet Ski",
      description: "A small motorized watercraft.",
      image: require("../assets/images/matching/hard/Jet_Ski.png"),
    },
    {
      name: "Hot Air Balloon",
      description: "A flying balloon with hot air.",
      image: require("../assets/images/matching/hard/Hot_air_balloon.png"),
    },
  ],
  [
    {
      name: "Ambulance",
      description: "A vehicle for medical emergencies.",
      image: require("../assets/images/matching/hard/Ambulance.png"),
    },
    {
      name: "Fire Truck",
      description: "A vehicle for firefighters.",
      image: require("../assets/images/matching/hard/Fire_truck.png"),
    },
    {
      name: "Spaceship",
      description: "A vehicle for space travel.",
      image: require("../assets/images/matching/hard/Spaceship.png"),
    },
    {
      name: "Police Car",
      description: "A vehicle used by law enforcement.",
      image: require("../assets/images/matching/hard/Police_Car.png"),
    },
  ],
  [
    {
      name: "Skateboard",
      description: "A board with wheels for riding.",
      image: require("../assets/images/matching/hard/Skateboard.png"),
    },
    {
      name: "Horse Carriage",
      description: "A wagon pulled by a horse.",
      image: require("../assets/images/matching/hard/Horse_cariage.png"),
    },
    {
      name: "Bulldozer",
      description: "A large vehicle for pushing heavy materials.",
      image: require("../assets/images/matching/hard/Bulldozer.png"),
    },
    {
      name: "ATV",
      description: "A small off-road vehicle.",
      image: require("../assets/images/matching/hard/ATV.png"),
    },
  ],
  [
    {
      name: "Cable Car",
      description: "A vehicle pulled by a cable on tracks.",
      image: require("../assets/images/matching/hard/Cable_Car.png"),
    },
    {
      name: "Submarine",
      description: "A watercraft that moves underwater.",
      image: require("../assets/images/matching/hard/Submarine.png"),
    },
    {
      name: "Gondola",
      description: "A small boat used in canals.",
      image: require("../assets/images/matching/hard/Gondola.png"),
    },
    {
      name: "Fishing Boat",
      description: "A boat used to catch fish.",
      image: require("../assets/images/matching/hard/Fishing_Boat.png"),
    },
  ],
  [
    {
      name: "Blimp",
      description: "A large airship filled with gas.",
      image: require("../assets/images/matching/hard/Blimp.png"),
    },
    {
      name: "Seaplane",
      description: "A plane that can land on water.",
      image: require("../assets/images/matching/hard/Seaplane.png"),
    },
    {
      name: "Fighter Jet",
      description: "A fast military aircraft.",
      image: require("../assets/images/matching/hard/Fighter_Jet.png"),
    },
    {
      name: "Snowmobile",
      description: "A vehicle for traveling on snow.",
      image: require("../assets/images/matching/hard/Snowmobile.png"),
    },
  ],
  [
    {
      name: "Hoverboard",
      description: "A self-balancing electric board.",
      image: require("../assets/images/matching/hard/Hoverboard.png"),
    },
    {
      name: "Unicycle",
      description: "A one-wheeled pedal vehicle.",
      image: require("../assets/images/matching/hard/Unicycle.png"),
    },
    {
      name: "Wheelchair",
      description: "A chair with wheels for mobility.",
      image: require("../assets/images/matching/hard/Wheelchair.png"),
    },
    {
      name: "Golf Cart",
      description: "A small electric vehicle for golf courses.",
      image: require("../assets/images/matching/hard/GolfCart.png"),
    },
  ],
  [
    {
      name: "Jeepney",
      description: "A public transport vehicle in the Philippines.",
      image: require("../assets/images/matching/hard/Jeepney.png"),
    },
    {
      name: "Forklift",
      description: "A small industrial vehicle for lifting heavy loads.",
      image: require("../assets/images/matching/hard/Forklift.png"),
    },
    {
      name: "Tow Truck",
      description: "A vehicle used to tow other vehicles.",
      image: require("../assets/images/matching/hard/Tow_Truck.png"),
    },
    {
      name: "Road Roller",
      description: "A heavy vehicle used to flatten roads.",
      image: require("../assets/images/matching/hard/Road_Roller.png"),
    },
  ],
  [
    {
      name: "Cement Mixer Truck",
      description: "A truck that mixes and transports cement.",
      image: require("../assets/images/matching/hard/Cement_Mixer_Truck.png"),
    },
    {
      name: "Tanker Truck",
      description: "A truck used to carry liquids or gas.",
      image: require("../assets/images/matching/hard/Tanker_Truck.png"),
    },
    {
      name: "Armored Truck",
      description: "A strong, bulletproof vehicle for transporting valuables.",
      image: require("../assets/images/matching/hard/Armored_Truck.png"),
    },
    {
      name: "Sidecar Motorcycle",
      description: "A motorcycle with an attached passenger seat.",
      image: require("../assets/images/matching/hard/Sidecar_Motorcycle.png"),
    },
  ],
];

export default matching;
