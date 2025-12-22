import data from '@/data/data.json'

/**
 * Data service to access application data using dot notation
 */
class DataService {
  /**
   * Get a value from the data object using dot notation
   * @param path - The path to the value (e.g., "formats.items", "about.hero.title")
   * @param defaultValue - Optional default value if path is not found
   * @returns The value at the specified path or undefined
   */
  get<T = any>(path: string, defaultValue?: T): T | undefined {
    const keys = path.split('.')
    let result: any = data

    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key]
      } else {
        return defaultValue
      }
    }

    return result as T
  }

  /**
   * Get all data (useful for debugging)
   */
  getAll() {
    return data
  }
}

// Export a singleton instance
export const dataService = new DataService()
export default dataService
