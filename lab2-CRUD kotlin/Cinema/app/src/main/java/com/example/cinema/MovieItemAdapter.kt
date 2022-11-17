package com.example.cinema

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.cinema.databinding.MovieItemCellBinding

class MovieItemAdapter(
    private val movieItems: List<MovieItem>,
    private val clickListener: MovieItemClickListener
): RecyclerView.Adapter<MovieItemViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MovieItemViewHolder {
        val from = LayoutInflater.from(parent.context)
        val binding = MovieItemCellBinding.inflate(from, parent, false)
        return MovieItemViewHolder(parent.context, binding, clickListener)
    }

    override fun onBindViewHolder(holder: MovieItemViewHolder, position: Int) {
        holder.bindMovieItem(movieItems[position])
    }

    override fun getItemCount(): Int = movieItems.size
}