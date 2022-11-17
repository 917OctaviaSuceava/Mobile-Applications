package com.example.cinema

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.cinema.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity(), MovieItemClickListener {

    private lateinit var binding: ActivityMainBinding
    private lateinit var movieViewModel: MovieViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        movieViewModel = ViewModelProvider(this).get(MovieViewModel::class.java)
        binding.newMovieButton.setOnClickListener{
            NewMovieSheet(null).show(supportFragmentManager, "newMovie")
        }
        setRecyclerView()
    }

    private fun setRecyclerView() {
        val mainActivity = this
        movieViewModel.movieItems.observe(this)
        {
            binding.movieRecyclerView.apply {
                layoutManager = LinearLayoutManager(applicationContext)
                adapter = MovieItemAdapter(it, mainActivity)
            }
        }
    }

    override fun editMovieItem(movieItem: MovieItem) {
        NewMovieSheet(movieItem).show(supportFragmentManager, "newMovie")
    }
}