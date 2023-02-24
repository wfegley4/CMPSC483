#pragma once
#ifdef STITCH_TRICK
#include "pch.h"
#endif

#define LOG_WARN_ENABLED
#define LOG_INFO_ENABLED
#define LOG_DEBUG_ENABLED
#define LOG_TRACE_ENABLED

#if NDEBUG
#undef LOG_DEBUG_ENABLED
#endif

enum LOG_LEVEL {
    LOG_LEVEL_FATAL = 0,
    LOG_LEVEL_ERROR = 1,
    LOG_LEVEL_WARN = 2,
    LOG_LEVEL_INFO = 3,
    LOG_LEVEL_DEBUG = 4,
    LOG_LEVEL_TRACE = 5
};

void log_output(LOG_LEVEL level, const char* message, ...);

#define FATAL(message, ...) log_output(LOG_LEVEL_FATAL, message, ##__VA_ARGS__)
#define ERROR(message, ...) log_output(LOG_LEVEL_ERROR, message, ##__VA_ARGS__)

#ifdef LOG_WARN_ENABLED
#define WARN(message, ...) log_output(LOG_LEVEL_WARN, message, ##__VA_ARGS__)
#else
#define WARN(message, ...)
#endif

#ifdef LOG_INFO_ENABLED
#define INFO(message, ...) log_output(LOG_LEVEL_INFO, message, ##__VA_ARGS__)
#else
#define INFO(message, ...)
#endif

#ifdef LOG_DEBUG_ENABLED
#define DEBUG(message, ...) log_output(LOG_LEVEL_DEBUG, message, ##__VA_ARGS__)
#else
#define DEBUG(message, ...)
#endif

#ifdef LOG_TRACE_ENABLED
#define TRACE(message, ...) log_output(LOG_LEVEL_TRACE, message, ##__VA_ARGS__)
#else
#define TRACE(message, ...)
#endif

#ifndef NDEBUG
#define VKH_CHECK(expr, success_log, fail_log) if (expr == VK_SUCCESS){success_log;} else {fail_log;}
#define VK_CHECK(expr, success_log, fail_log) if (expr == vk::Result::eSuccess){success_log;} else {fail_log;}
#define ASSERT(expr, success_log, fail_log) if (expr){success_log;} else {fail_log;}
#else
#define VKH_CHECK(expr, success_log, fail_log) expr;
#define VK_CHECK(expr, success_log, fail_log) expr;
#define ASSERT(expr, success_log, fail_log) expr;
#endif