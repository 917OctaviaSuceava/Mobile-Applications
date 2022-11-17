package com.example.cinema

import android.content.Context
import androidx.recyclerview.widget.RecyclerView
import com.example.cinema.databinding.MovieItemCellBinding

class MovieItemViewHolder(
    private val context: Context,
    private val binding: MovieItemCellBinding,
    private val clickListener: MovieItemClickListener
): RecyclerView.ViewHolder(binding.root) {

    fun bindMovieItem(movieItem: MovieItem)
    {
        binding.name.text = movieItem.title
        binding.actors.text = movieItem.actors
        binding.description.text = movieItem.description
        binding.duration.text = movieItem.duration
        binding.dateAndTime.text = movieItem.datetime

        binding.movieCellContainer.setOnClickListener{
            clickListener.editMovieItem(movieItem)
        }
    }
}