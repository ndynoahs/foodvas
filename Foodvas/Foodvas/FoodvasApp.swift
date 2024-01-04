//
//  FoodvasApp.swift
//  Foodvas
//
//  Created by Ndynoahs on 1/4/24.
//

import SwiftUI

@main
struct FoodvasApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
