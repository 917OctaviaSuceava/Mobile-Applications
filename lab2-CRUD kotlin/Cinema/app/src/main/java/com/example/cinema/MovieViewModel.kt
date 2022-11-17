package com.example.cinema

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import java.util.UUID

class MovieViewModel: ViewModel() {
    var movieItems = MutableLiveData<MutableList<MovieItem>>()
    /*var title = MutableLiveData<String>()
    var desc = MutableLiveData<String>()
    var duration = MutableLiveData<String>()
    var actors = MutableLiveData<String>()
    var movieDateTime = MutableLiveData<String>()*/

    init {
        movieItems.value = mutableListOf()
    }

    fun addMovieItem(newMovieItem: MovieItem) {
        val list = movieItems.value
        list!!.add(newMovieItem)
        movieItems.postValue(list)
    }

    fun updateMovieItem(id: UUID, title: String, description: String, actors: String,
                        duration: String, datetime: String) {
        val list = movieItems.value
        val movie = list!!.find { it.id == id}!!
        movie.actors = actors
        movie. title = title
        movie.description = description
        movie.duration = duration
        movie.datetime = datetime

        movieItems.postValue(list)
    }
}