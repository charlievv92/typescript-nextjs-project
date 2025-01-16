const db = require("../config/db");

/**
 * 비동기로 쿼리를 실행하고 결과를 반환하는 함수. 복잡한 쿼리문을 실행하거나 여러 쿼리문을 실행할 때 사용
 * @param {string} sql 실행할 쿼리문
 * @param {*} params 쿼리문에 바인딩할 파라미터
 * @returns {Promise} 결과를 반환하는 프로미스 객체
 */
const queryAsync = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

/**
 * 조건절 생성 함수
 * @param {object} conditions 조건 객체
 * @returns {object} whereClause, conditionValues 객체
 */
const buildWhereClause = (conditions) => {
  const result = {
    whereClauses: [],
    conditionValues: [],
    addBetween(field, min, max) {
      this.whereClauses.push(`${field} BETWEEN ? AND ?`);
      this.conditionValues.push(min, max);
    },
    addIn(field, values) {
      this.whereClauses.push(
        `${field} IN (${values.map(() => "?").join(", ")})`
      );
      this.conditionValues.push(...values);
    },
    addIs(field, value) {
      this.whereClauses.push(`${field} = ?`);
      this.conditionValues.push(value);
    },
    addNot(field, value) {
      this.whereClauses.push(`${field} != ?`);
      this.conditionValues.push(value);
    },
    addLike(field, value) {
      this.whereClauses.push(`${field} LIKE ?`);
      this.conditionValues.push(`%${value}%`);
    },
    addGt(field, value) {
      this.whereClauses.push(`${field} > ?`);
      this.conditionValues.push(value);
    },
    addGte(field, value) {
      this.whereClauses.push(`${field} >= ?`);
      this.conditionValues.push(value);
    },
    addLt(field, value) {
      this.whereClauses.push(`${field} < ?`);
      this.conditionValues.push(value);
    },
    addLte(field, value) {
      this.whereClauses.push(`${field} <= ?`);
      this.conditionValues.push(value);
    },
    build() {
      return {
        whereClause: this.whereClauses.length
          ? ` WHERE ${this.whereClauses.join(" AND ")}`
          : "",
        conditionValues: this.conditionValues,
      };
    },
  };

  Object.keys(conditions).forEach((key) => {
    const condition = conditions[key];

    // 조건이 객체이고 type이 있는 경우
    if (
      typeof condition === "object" &&
      !Array.isArray(condition) &&
      condition.type
    ) {
      switch (condition.type) {
        case "not":
          result.addNot(key, condition.value);
          break;
        case "like":
          result.addLike(key, condition.value);
          break;
        case "gt":
          result.addGt(key, condition.value);
          break;
        case "gte":
          result.addGte(key, condition.value);
          break;
        case "lt":
          result.addLt(key, condition.value);
          break;
        case "lte":
          result.addLte(key, condition.value);
          break;
        case "in":
          result.addIn(key, condition.value);
          break;
        case "is":
          result.addIs(key, condition.value);
          break;
        case "between":
          let [min, max] = condition.value; // 구조 분해 할당으로 더 깔끔하게

          // 값 검증 추가
          if (min == null || max == null) {
            throw new Error(
              `Invalid between values for ${key}: min and max are required`
            );
          }

          // 숫자 타입으로 변환 (필요한 경우)
          min = Number(min);
          max = Number(max);

          if (isNaN(min) || isNaN(max)) {
            throw new Error(
              `Invalid between values for ${key}: values must be numbers`
            );
          }

          // min, max 순서 보정
          if (min > max) {
            [min, max] = [max, min]; // 구조 분해 할당으로 swap
          }
          result.addBetween(key, min, max);
          break;
      }
    }
    // 배열인 경우 IN 처리
    else if (Array.isArray(condition)) {
      result.addIn(key, condition);
    }
    // 나머지 경우는 일반 등호 비교
    else {
      result.addIs(key, condition);
    }
  });

  // return {
  //   whereClause: whereClauses.length
  //     ? ` WHERE ${whereClauses.join(" AND ")}`
  //     : "",
  //   conditionValues,
  // };
  return result.build();
};

/**
 * DB INSERT 쿼리문
 * @param {string} table 테이블명
 * @param {object} data 입력할 데이터 객체
 * @returns {Promise} 삽입 결과 객체.
 */
const create = (table, data) => {
  const columns = Object.keys(data).join(", ");
  const placeholders = Object.keys(data)
    .map(() => "?")
    .join(", ");
  const values = Object.values(data);
  const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
  console.log(sql);
  console.log(values);
  return queryAsync(sql, values);
};

/**
 * DB SELECT 쿼리문
 * SELECT * FROM table WHERE conditions ORDER BY orderBy
 * @param {string} table 테이블명
 * @param {Array.<string>|string} columns 조회할 컬럼명
 * @param {object} conditions 조회 조건 객체
 * @param {object|""} orderBy 정렬 조건
 * @returns {Promise} 조회 결과 객체.
 */
const read = (table, columns = "*", conditions = {}, orderBy = "") => {
  const columnsClause = Array.isArray(columns) ? columns.join(", ") : columns;

  const { whereClause, conditionValues } = buildWhereClause(conditions);

  const sql = `SELECT ${columnsClause} FROM ${table}${whereClause}${
    orderBy ? ` ORDER BY ${orderBy}` : ""
  }`;
  console.log(sql);
  console.log(conditionValues);
  return queryAsync(sql, conditionValues);
  // const whereClauses = [];
  // const values = [];

  // Object.keys(conditions).forEach((key) => {
  //   const condition = conditions[key];

  //   // 조건이 객체이고 type이 있는 경우
  //   if (
  //     typeof condition === "object" &&
  //     !Array.isArray(condition) &&
  //     condition.type
  //   ) {
  //     switch (condition.type) {
  //       case "not":
  //         whereClauses.push(`${key} != ?`);
  //         values.push(condition.value);
  //         break;
  //       case "like":
  //         whereClauses.push(`${key} LIKE ?`);
  //         values.push(`%${condition.value}%`);
  //         break;
  //       case "gt":
  //         whereClauses.push(`${key} > ?`);
  //         values.push(condition.value);
  //         break;
  //       case "gte":
  //         whereClauses.push(`${key} >= ?`);
  //         values.push(condition.value);
  //         break;
  //       case "lt":
  //         whereClauses.push(`${key} < ?`);
  //         values.push(condition.value);
  //         break;
  //       case "lte":
  //         whereClauses.push(`${key} <= ?`);
  //         values.push(condition.value);
  //         break;
  //       case "in":
  //         if (Array.isArray(condition.value)) {
  //           const placeholders = condition.value.map(() => "?").join(", ");
  //           whereClauses.push(`${key} IN (${placeholders})`);
  //           values.push(...condition.value);
  //         }
  //         break;
  //       case "is":
  //         whereClauses.push(`${key} = ?`);
  //         values.push(condition.value);
  //         break;
  //     }
  //   }
  //   // 배열인 경우 IN 처리
  //   else if (Array.isArray(condition)) {
  //     const placeholders = condition.map(() => "?").join(", ");
  //     whereClauses.push(`${key} IN (${placeholders})`);
  //     values.push(...condition);
  //   }
  //   // 나머지 경우는 일반 등호 비교
  //   else {
  //     whereClauses.push(`${key} = ?`);
  //     values.push(condition);
  //   }
  // });
};

/**
 * DB UPDATE 쿼리문
 * @param {string} table 테이블명
 * @param {object} data 업데이트할 데이터 객체
 * @param {object} conditions 업데이트할 조건 객체
 * @returns {Promise} 업데이트 결과 객체.
 */
const update = (table, data, conditions) => {
  const setClause = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(", ");

  const values = [...Object.values(data)];

  const { whereClause, conditionValues } = buildWhereClause(conditions);

  values.push(...conditionValues);

  const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
  console.log(sql);
  console.log(values);
  return queryAsync(sql, values);
  // const whereClauses = [];

  // Object.keys(conditions).forEach((key) => {
  //   const condition = conditions[key];

  //   // 조건이 객체이고 type이 있는 경우
  //   if (
  //     typeof condition === "object" &&
  //     !Array.isArray(condition) &&
  //     condition.type
  //   ) {
  //     switch (condition.type) {
  //       case "not":
  //         whereClauses.push(`${key} != ?`);
  //         values.push(condition.value);
  //         break;
  //       case "like":
  //         whereClauses.push(`${key} LIKE ?`);
  //         values.push(`%${condition.value}%`);
  //         break;
  //       case "gt":
  //         whereClauses.push(`${key} > ?`);
  //         values.push(condition.value);
  //         break;
  //       case "gte":
  //         whereClauses.push(`${key} >= ?`);
  //         values.push(condition.value);
  //         break;
  //       case "lt":
  //         whereClauses.push(`${key} < ?`);
  //         values.push(condition.value);
  //         break;
  //       case "lte":
  //         whereClauses.push(`${key} <= ?`);
  //         values.push(condition.value);
  //         break;
  //       case "in":
  //         if (Array.isArray(condition.value)) {
  //           const placeholders = condition.value.map(() => "?").join(", ");
  //           whereClauses.push(`${key} IN (${placeholders})`);
  //           values.push(...condition.value);
  //         }
  //         break;
  //       case "is":
  //         whereClauses.push(`${key} = ?`);
  //         values.push(condition.value);
  //         break;
  //     }
  //   }
  //   // 배열인 경우 IN 처리
  //   else if (Array.isArray(condition)) {
  //     const placeholders = condition.map(() => "?").join(", ");
  //     whereClauses.push(`${key} IN (${placeholders})`);
  //     values.push(...condition);
  //   }
  //   // 나머지 경우는 일반 등호 비교
  //   else {
  //     whereClauses.push(`${key} = ?`);
  //     values.push(condition);
  //   }
  // });
};

/**
 * DELETE 쿼리문
 * @param {string} table
 * @param {object} conditions
 * @returns {Promise} 삭제 결과 객체.
 */
const remove = (table, conditions) => {
  const { whereClause, conditionValues } = buildWhereClause(conditions);
  const sql = `DELETE FROM ${table} WHERE ${whereClause}`;
  console.log(sql);
  console.log(conditionValues);
  return queryAsync(sql, conditionValues);
  // const whereClauses = [];
  // const values = [];

  // Object.keys(conditions).forEach((key) => {
  //   const condition = conditions[key];

  //   // 조건이 객체이고 type이 있는 경우
  //   if (
  //     typeof condition === "object" &&
  //     !Array.isArray(condition) &&
  //     condition.type
  //   ) {
  //     switch (condition.type) {
  //       case "not":
  //         whereClauses.push(`${key} != ?`);
  //         values.push(condition.value);
  //         break;
  //       case "like":
  //         whereClauses.push(`${key} LIKE ?`);
  //         values.push(`%${condition.value}%`);
  //         break;
  //       case "gt":
  //         whereClauses.push(`${key} > ?`);
  //         values.push(condition.value);
  //         break;
  //       case "gte":
  //         whereClauses.push(`${key} >= ?`);
  //         values.push(condition.value);
  //         break;
  //       case "lt":
  //         whereClauses.push(`${key} < ?`);
  //         values.push(condition.value);
  //         break;
  //       case "lte":
  //         whereClauses.push(`${key} <= ?`);
  //         values.push(condition.value);
  //         break;
  //       case "in":
  //         if (Array.isArray(condition.value)) {
  //           const placeholders = condition.value.map(() => "?").join(", ");
  //           whereClauses.push(`${key} IN (${placeholders})`);
  //           values.push(...condition.value);
  //         }
  //         break;
  //       case "is":
  //         whereClauses.push(`${key} = ?`);
  //         values.push(condition.value);
  //         break;
  //     }
  //   }
  //   // 배열인 경우 IN 처리
  //   else if (Array.isArray(condition)) {
  //     const placeholders = condition.map(() => "?").join(", ");
  //     whereClauses.push(`${key} IN (${placeholders})`);
  //     values.push(...condition);
  //   }
  //   // 나머지 경우는 일반 등호 비교
  //   else {
  //     whereClauses.push(`${key} = ?`);
  //     values.push(condition);
  //   }
  // });
};

module.exports = { queryAsync, create, read, update, remove };
