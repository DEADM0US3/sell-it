import type {LaptopDto} from "../../../contracts/laptop/laptopDto.ts";
import type {LaptopCreateDto} from "../../../contracts/laptop/laptopCreateDto.ts";

export function buildPredictRequestBodyFromLaptop(laptop: LaptopCreateDto) {
    return {
        status: mapConditionToStatus(laptop.condition),  // 'New' | 'Refurbished' esperados
        brand: laptop.brand,
        cpu: laptop.cpu,
        ram: laptop.ram_gb,
        storage: laptop.storage_gb,
        storage_type: mapStorageType(laptop.storage_type),  // Mapeo para 'SSD' | 'eMMC'
        gpu: laptop.gpu,
        screen_size: laptop.screen_size,
        touch_support: laptop.touch_support,
    };
}

// Mapeo para el campo 'status' esperado por la DB/API (según tu tabla: 'New', 'Refurbished')
function mapConditionToStatus(condition: LaptopDto["condition"]): "New" | "Refurbished" {
    switch(condition.toLowerCase()) {
        case "new": return "New";
        case "refurbished": return "Refurbished";
        default: return "New"; // o lanzar error, o manejar 'used' como quieras
    }
}

// Mapeo para storage_type, que en DTO puede ser más amplio
function mapStorageType(storageType: LaptopDto["storage_type"]): "SSD" | "eMMC" {
    switch(storageType.toUpperCase()) {
        case "SSD":
        case "NVME":
            return "SSD";
        case "EMMC":
            return "eMMC";
        default:
            return "SSD"; // default o error según tu criterio
    }
}