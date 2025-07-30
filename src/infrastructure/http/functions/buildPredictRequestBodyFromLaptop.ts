import type {LaptopDto} from "../../../contracts/laptop/laptopDto.ts";
import type {LaptopCreateDto} from "../../../contracts/laptop/laptopCreateDto.ts";

export function buildPredictRequestBodyFromLaptop(laptop: LaptopCreateDto) {
    return {
        status: mapConditionToStatus(laptop.condition),
        brand: laptop.brand,
        cpu: laptop.cpu,
        ram: laptop.ram_gb,
        storage: laptop.storage_gb,
        storage_type: mapStorageType(laptop.storage_type),
        gpu: laptop.gpu,
        screen_size: laptop.screen_size,
        touch_support: laptop.touch_support,
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