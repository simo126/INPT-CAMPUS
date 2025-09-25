package com.inptcampus.backend.Config;

import com.inptcampus.backend.Model.Building;
import com.inptcampus.backend.Model.Filiere;
import com.inptcampus.backend.Model.Room;
import com.inptcampus.backend.Model.RoomType;
import com.inptcampus.backend.Repository.BuildingRepository;
import com.inptcampus.backend.Repository.FiliereRepository;
import com.inptcampus.backend.Repository.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner initDatabase(BuildingRepository buildingRepository, RoomRepository roomRepository,
                                   FiliereRepository filiereRepository) {
        return args -> {
            System.out.println("DataBase Seeder ");
//         createBuildingWithRooms(buildingRepository, roomRepository, "pav1", 6, 2);
//         createBuildingWithRooms(buildingRepository, roomRepository, "pav2", 2, 4);
//         createBuildingWithRooms(buildingRepository, roomRepository, "pav3", 4, 2);
//         createFiliere(filiereRepository, "Ingénierie logicielle avancée pour les services numériques", "ASEDS",
//                 "Concerne le développement et l'ingénierie de logiciels pour les services digitaux.", true);
//         createFiliere(filiereRepository, "Sciences de Données", "DATA",
//                 "Axée sur l'analyse, la gestion et l'exploitation des données.", true);
//         createFiliere(filiereRepository, "Cybersécurité et Confiance Numérique", "CLOUD",
//                 "Vise à développer les compétences nécessaires pour la sécurité des systèmes d'information et la confiance dans le numérique.", true);
//         createFiliere(filiereRepository, "Systèmes Embarqués et Services Numériques", "SESNUM",
//                 "Formation axée sur les systèmes embarqués (objets connectés, etc.) et leurs services numériques associés.", true);
//         createFiliere(filiereRepository, "Ingénierie des Technologies de l'Information et de Communication Intelligentes (Smart ICT)", "SMART",
//                 "Ingénierie pour les TIC intelligentes, incluant les technologies d'information et de communication.", true);
//         createFiliere(filiereRepository, "Innovation et AMOA", "AMOA",
//                 "Spécialisation orientée vers l'innovation et le soutien à la maîtrise d'ouvrage dans les projets technologiques.", true);
//         createFiliere(filiereRepository, "Ingénierie des Systèmes Ubiquitaires et Distribués – Cloud et IoT", "ICCN",
//                 "Formation spécialisée dans les systèmes ubiquitaires, les systèmes distribués, le cloud computing et l'Internet des Objets (IoT).", true);
        };
    }
    private void createFiliere(FiliereRepository filiereRepository, String name, String code, String description, boolean active) {
        if (filiereRepository.existsByCode(code)) {
            return; // skip if already exists
        }

        Filiere filiere = new Filiere();
        filiere.setName(name);
        filiere.setCode(code);
        filiere.setDescription(description);
        filiere.setActive(active);

        filiereRepository.save(filiere);
        System.out.println("Created filiere: " + name);
    }
    private void createBuildingWithRooms(BuildingRepository buildingRepository, RoomRepository roomRepository,
                                         String buildingName, int numFloors, int maxCapacity) {

        // ✅ Fetch existing building or create new one if not exists
        Building building = buildingRepository.findByName(buildingName)
                .orElseGet(() -> {
                    Building newBuilding = new Building();
                    newBuilding.setName(buildingName);
                    newBuilding.setAddress(buildingName + " Address");
                    newBuilding.setNumFloors(numFloors);
                    newBuilding.setActive(true);
                    return buildingRepository.save(newBuilding);
                });

        // ✅ Only add rooms if building has none


        for (int floor = 1; floor <= numFloors; floor++) {
            int startRoom = floor * 100 + 1; // e.g., floor 1 -> 101
            int endRoom = floor * 100 + 28;  // up to 28 rooms per floor

            for (int roomNumber = startRoom; roomNumber <= endRoom; roomNumber++) {
                String roomNumberStr = buildingName+"-"+String.valueOf(roomNumber);

                // ✅ Skip if room already exists in this building
                if (roomRepository.existsByBuildingAndRoomNumber(building, roomNumberStr)) {
                    continue;
                }

                Room room = new Room();
                room.setBuilding(building);
                room.setFloor(floor);
                room.setRoomNumber(roomNumberStr);

                if (maxCapacity == 2) {
                    room.setRoomType(RoomType.DOUBLE);
                } else if (maxCapacity == 4) {
                    room.setRoomType(RoomType.QUADRUPLE);
                } else {
                    throw new IllegalArgumentException("Unsupported maxCapacity: " + maxCapacity);
                }

                room.setMaxCapacity(maxCapacity);
                room.setCurrentOccupancy(0);
                room.setActive(true);

                roomRepository.save(room);
            }
        }

        System.out.println("Added " + (numFloors * 28) + " rooms to " + buildingName +
                " (" + maxCapacity + " per room, type=" +
                (maxCapacity == 2 ? "DOUBLE" : "QUADRUPLE") + ")");
    }

}
