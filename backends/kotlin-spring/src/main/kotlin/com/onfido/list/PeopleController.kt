package com.onfido.list

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import jakarta.annotation.PostConstruct
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.io.File

@RestController
@CrossOrigin(origins = ["*"])
class PeopleController(private val mapper: ObjectMapper) {

    @Value("\${people.data-path}")
    private lateinit var dataPath: String

    private lateinit var people: List<Map<String, Any>>

    @PostConstruct
    fun init() {
        val file = File(dataPath)
        people = mapper.readValue(file.readText())
    }

    @GetMapping("/")
    fun health() = mapOf("status" to "ok", "service" to "fullstack-list-backend-kotlin")

    @GetMapping("/people")
    fun getPeople(
        @RequestParam(defaultValue = "1") page: Int,
        @RequestParam(defaultValue = "10") limit: Int
    ): Map<String, Any> {
        val effectivePage = maxOf(1, page)
        val effectiveLimit = maxOf(1, minOf(100, limit))

        val results = people

        val total = results.size
        val offset = (effectivePage - 1) * effectiveLimit
        val data = results.drop(offset).take(effectiveLimit)

        return mapOf("data" to data, "meta" to mapOf("total" to total, "page" to effectivePage, "limit" to effectiveLimit))
    }

    @GetMapping("/people/{id}")
    fun getPersonById(@PathVariable id: String): Map<String, Any> {
        val index = id.toIntOrNull()
        if (index == null || index < 0 || index >= people.size) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Person not found")
        }
        return people[index]
    }
}
