// CLIMATECROP - CROP INFORMATION

export const crops = [

    {
        id: 1,
        name: "Cotton",
        season: "Kharif",
        cropFamily: "Malvaceae",
        waterRequirement: "To be researched",
        soilSuitability: "To be researched",
        source: "Add verified ICAR or PDKV source"
    },

    {
        id: 2,
        name: "Soybean",
        season: "Kharif",
        cropFamily: "Legume",
        waterRequirement: "To be researched",
        soilSuitability: "To be researched",
        source: "Add verified ICAR or PDKV source"
    },

    {
        id: 3,
        name: "Sorghum (Jowar)",
        season: "Kharif / Rabi",
        cropFamily: "Cereal",
        waterRequirement: "To be researched",
        soilSuitability: "To be researched",
        source: "Add verified ICAR or PDKV source"
    }

];


// DISPLAY CROP INFORMATION

export function getAllCrops() {
    return crops;
}


// FIND A CROP BY NAME

export function findCrop(cropName) {

    return crops.find(
        crop => crop.name.toLowerCase() === cropName.toLowerCase()
    );

}