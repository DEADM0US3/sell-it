import type {LaptopDto} from "../../../contracts/laptop/laptopDto.ts";
import type {LaptopCreateDto} from "../../../contracts/laptop/laptopCreateDto.ts";

export function buildPredictRequestBodyFromLaptop(laptop: LaptopCreateDto) {

    let touch = 'No'
    if(laptop.touch_support === true){
        touch = 'Yes'
    }

    return {
        Status: mapConditionToStatus(laptop.condition),
        Brand: laptop.brand,
        Model: laptop.model,
        CPU: laptop.cpu,
        RAM: laptop.ram_gb,
        Storage: laptop.storage_gb,
        Storage_type: mapStorageType(laptop.storage_type),
        GPU: laptop.gpu,
        Screen: laptop.screen_size,
        Touch: touch,
    };
}

function mapConditionToStatus(condition: LaptopDto["condition"]): "New" | "Refurbished" {
    switch(condition.toLowerCase()) {
        case "new": return "New";
        case "refurbished": return "Refurbished";
        default: return "New";
    }
}

function mapStorageType(storageType: LaptopDto["storage_type"]): "SSD" | "eMMC" {
    switch(storageType.toUpperCase()) {
        case "SSD":
        case "NVME":
            return "SSD";
        case "EMMC":
            return "eMMC";
        default:
            return "SSD";
    }
}