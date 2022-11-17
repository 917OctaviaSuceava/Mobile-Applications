package com.example.cinema

import android.os.Bundle
import android.text.Editable
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProvider
import com.example.cinema.databinding.FragmentNewMovieSheetBinding
import com.google.android.material.bottomsheet.BottomSheetDialogFragment

class NewMovieSheet(var movieItem: MovieItem?) : BottomSheetDialogFragment() {

    private lateinit var binding: FragmentNewMovieSheetBinding
    private lateinit var movieViewModel: MovieViewModel

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val activity = requireActivity()

        if(movieItem != null)
        {
            binding.newMovieTitle.text = "Edit Movie"
            val editable = Editable.Factory.getInstance()
            binding.name.text = editable.newEditable(movieItem!!.title)
            binding.description.text = editable.newEditable(movieItem!!.description)
            binding.actors.text = editable.newEditable(movieItem!!.actors)
            binding.duration.text = editable.newEditable(movieItem!!.duration)
            binding.datetime.text = editable.newEditable(movieItem!!.datetime)
        }
        else {
            binding.newMovieTitle.text = "New Movie"
        }
        movieViewModel = ViewModelProvider(activity).get(MovieViewModel::class.java)
        binding.saveButton.setOnClickListener{
            saveAction()
        }
    }

    private fun saveAction() {
        /*movieViewModel.title.value = binding.name.text.toString()
        movieViewModel.actors.value = binding.actors.text.toString()
        movieViewModel.duration.value = binding.duration.text.toString()
        movieViewModel.movieDateTime.value = binding.datetime.text.toString()
        movieViewModel.desc.value = binding.description.text.toString()*/
        val name = binding.name.text.toString()
        val actors = binding.actors.text.toString()
        val duration = binding.duration.text.toString()
        val movieDateTime = binding.datetime.text.toString()
        val desc = binding.description.text.toString()

        if(movieItem == null)
        {
            val newMovie = MovieItem(name, desc, duration, movieDateTime, actors)
            movieViewModel.addMovieItem(newMovie)
        }
        else {
            movieViewModel.updateMovieItem(movieItem!!.id, name, desc, actors, duration, movieDateTime)
        }

        binding.name.setText("")
        binding.actors.setText("")
        binding.duration.setText("")
        binding.datetime.setText("")
        binding.description.setText("")
        dismiss()
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentNewMovieSheetBinding.inflate(inflater, container, false)
        return binding.root
    }

}