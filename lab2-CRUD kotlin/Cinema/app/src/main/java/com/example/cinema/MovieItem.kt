package com.example.cinema

import java.util.UUID

class MovieItem(
    var title: String,
    var description: String,
    var duration: String,
    var datetime: String,
    var actors: String,
    var id: UUID = UUID.randomUUID()
) {
}